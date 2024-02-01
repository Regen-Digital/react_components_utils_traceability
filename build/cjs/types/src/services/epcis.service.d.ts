import { IdentificationKeyType } from '../models/gs1';
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
export declare const createEPCISTransactionEvent: (params: EPCISTransactionEventParams) => Promise<string>;
