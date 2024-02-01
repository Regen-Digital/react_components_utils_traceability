import {
  EPCIS,
  EPCISEventAction,
  EPCISEventDisposition,
  EPCISEventType,
  MANDATORY_CONTEXTS,
} from '../models/epcis';
import {
  LinkResolver,
  LinkResponse,
  IdentificationKeyType,
  LinkType,
  MimeType,
} from '../models/gs1';
import { createLinkResolver } from './createLinkResolver.service';
import { BucketName, uploadJson } from './uploadJson.service';

export type Party = {
  partyID: string;
  name: string;
};

export type Transaction = {
  type: string;
  identifier: string;
  documentURL: string;
};

export type Item = {
  itemID: string;
  name: string;
};

export type EPCISTransactionEventParams = {
  context: string[];
  sourceParty: Party;
  destinationParty: Party;
  transaction: Transaction;
  itemList: Item[];
  identificationKey: string;
  identificationKeyType: IdentificationKeyType;
  readPointId: string;
  locationId: string;
};

/**
 * Creates an EPCIS Transaction Event and uploads it to S3 storage, then links it to DLR.
 *
 * @param params - An object containing the parameters for creating the EPCIS Transaction Event.
 * @returns The URL for the created EPCIS Transaction Event.
 *
 * @example
 * const params = {
 *   context: ['https://gs1.org/vc'],
 *   sourceParty: {
 *     partyID: 'urn:uuid:12345678-1234-5678-1234-567812345678',
 *     name: 'John Doe',
 *   },
 *   destinationParty: {
 *     partyID: 'urn:uuid:12345678-1234-5678-1234-567812345678',
 *     name: 'John Doe',
 *   },
 *   transaction: {
 *     type: 'inv',
 *     identifier: 'urn:epc:id:sgtin:0614141.107346.115',
 *     documentURL: 'https://storage.com/transaction.json',
 *   },
 *   itemList: [
 *     {
 *       itemID: 'urn:epc:id:sgtin:0614141.107346.115',
 *       name: 'Deforestation-free Braford beef cattle',
 *     },
 *   ],
 *   identificationKey: '3ABCD123XBDC0447',
 *   identificationKeyType: 'nlisid',
 * };
 *
 * const eventUrl = createEPCISTransactionEvent(params);
 * // Returns: http://localhost/nlisid/3ABCD123XBDC0447?linkType=all
 */
export const createEPCISTransactionEvent = async (
  params: EPCISTransactionEventParams
): Promise<string> => {
  const epcis = constructEPCISTransactionEvent(params);

  const epcisURL = await uploadJson(
    `epcis-${params.identificationKeyType}-${params.identificationKey}`,
    BucketName.EPCISEvent,
    epcis
  );

  return await registerLinkResolverForEPCIS(
    params.identificationKeyType,
    params.identificationKey,
    epcisURL
  );
};

const registerLinkResolverForEPCIS = async (
  identificationKeyType: IdentificationKeyType,
  identificationKey: string,
  epcisURL: string
) => {
  const linkResolver: LinkResolver = {
    identificationKeyType,
    identificationKey: identificationKey,
    itemDescription: `EPCIS Transaction Event for ${identificationKey}`,
  };

  const linkResponses: LinkResponse[] = [
    {
      linkType: LinkType.epcisLinkType,
      linkTitle: 'EPCIS Transaction Event',
      targetUrl: epcisURL,
      mimeType: MimeType.applicationJson,
    },
  ];

  return await createLinkResolver(linkResolver, linkResponses);
};

const constructEPCISTransactionEvent = (
  params: EPCISTransactionEventParams
) => {
  const {
    sourceParty,
    destinationParty,
    transaction,
    itemList,
    context,
    readPointId,
    locationId,
  } = params;

  const eventTime = new Date().toUTCString();

  const epcis: EPCIS = {
    '@context': [...MANDATORY_CONTEXTS, ...context],
    type: 'EPCISDocument',
    schemaVersion: '2.0',
    creationDate: eventTime,
    epcisBody: {
      eventList: [
        {
          eventType: EPCISEventType.Transaction,
          eventTime,
          sourceParty,
          destinationParty,
          transaction,
          itemList,
          readPointId,
          locationId,
          actionCode: EPCISEventAction.Observe,
          dispositionCode: EPCISEventDisposition.InTransit,
        },
      ],
    },
  };
  return epcis;
};
