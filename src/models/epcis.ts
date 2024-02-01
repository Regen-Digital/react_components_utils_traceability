export enum EPCISEventType {
    Transformation = 'transformation',
    Object = 'object',
    Aggregation = 'aggregation',
    Transaction = 'transaction',
    Association = 'association',
}

export enum EPCISEventAction {
    Observe = 'observe',
}

export enum EPCISEventDisposition {
    InTransit = 'in_transit',
}

export interface EPCISEvent {
    eventType: EPCISEventType;
    eventTime: string;
    actionCode: string;
    dispositionCode: string;
    readPointId: { id: string } | string;
    locationId: { id: string } | string;

    [key: string]: any;
}

export interface EPCIS {
    '@context': string[];
    type: string;
    schemaVersion: string;
    creationDate: string;
    epcisBody: {
        eventList: EPCISEvent[];
    };

    [key: string]: any;
}

export const MANDATORY_CONTEXTS = ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'];

// export const epcisTransactionCrendentialRender: any = {
//     render: [
//         {
//             template:
//                 // eslint-disable-next-line quotes
//                 '<div style='width: 400px; padding: 20px; background-color: #e3eff2'> <div style='text-align: center; margin-bottom: 20px; font-weight: bold'> <span>Ag</span><span style='color: #15728d'>Trace</span> </div> <div style=' background-color: white; border-radius: 8px; padding: 16px; margin-top: 32px; ' > <div style=' text-align: left; font-weight: bold; padding-top: 6px; padding-bottom: 6px; ' > Transformation Event </div> <table style='border-spacing: 5px'> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > ID </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.eventID}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Transaction Type </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.transaction.type}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Event Time </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.eventTime}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Action Code </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.actionCode}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Disposition Code </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.dispositionCode}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Document URL </td> <td style='width: 100%; text-align: end; color: #778180'> <a href='{{credentialSubject.transaction.documentURL}}'>Link</a> </td> </tr> </table> </div> <div style=' background-color: white; border-radius: 8px; padding: 16px; margin-top: 32px; ' > <div style=' text-align: left; font-weight: bold; padding-top: 6px; padding-bottom: 6px; ' > Issued by: </div> <table style='border-spacing: 5px'> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > ID </td> <td style='width: 100%; text-align: end; color: #778180'> {{issuer.id}} </td> </tr> </table> </div> <div style=' background-color: white; border-radius: 8px; padding: 16px; margin-top: 32px; ' > <div style=' text-align: left; font-weight: bold; padding-top: 6px; padding-bottom: 6px; ' > Source </div> <table style='border-spacing: 5px'> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > ID </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.sourceParty.partyID}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Name </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.sourceParty.name}} </td> </tr> </table> </div> <div style=' background-color: white; border-radius: 8px; padding: 16px; margin-top: 32px; ' > <div style=' text-align: left; font-weight: bold; padding-top: 6px; padding-bottom: 6px; ' > Destination </div> <table style='border-spacing: 5px'> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > ID </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.destinationParty.partyID}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Name </td> <td style='width: 100%; text-align: end; color: #778180'> {{credentialSubject.destinationParty.name}} </td> </tr> </table> </div> <div style=' background-color: white; border-radius: 8px; padding: 16px; margin-top: 32px; ' > <div style=' text-align: left; font-weight: bold; padding-top: 6px; padding-bottom: 6px; ' > Items </div> <table style='border-spacing: 5px'> {{#each credentialSubject.itemList}} <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Type </td> <td style='width: 100%;text-align: end; color: #778180'> {{this.type}} </td> </tr> <tr style='border-bottom: 1px solid #e3eff2'> <td style='white-space:nowrap; padding-top: 6px; padding-bottom: 6px; color: #2b2d2e' > Passport </td> <td style='width: 100%; text-align: end; color: #778180'> <a href='{{this.itemID}}'>Link</a> </td> </tr> {{/each}} </table> </div></div>',
//             '@type': 'WebRenderingTemplate2022',
//         },
//     ],
// };
