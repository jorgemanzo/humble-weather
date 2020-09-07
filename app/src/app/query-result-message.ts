import { Weather } from './weather';

export interface QueryResultMessage {
    message: string,
    ok: boolean,
    results: [Weather]
}
