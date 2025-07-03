import { Event, EventContainer as OriginalEventContainer } from "add_event_container";
import Logger, { LoggerInterface } from "add_logger";

export interface NamedEventHandler {
    name: string;
    handler: (event: Event) => void;
}


export class EventContainer extends OriginalEventContainer {


    logger: LoggerInterface;

    constructor(options?: { logger: LoggerInterface }) {
        super();
        this.logger = options?.logger ?? new Logger('event_container');
    }
    override dispatchEvent(event: Event): void {
        this.logger.info( "Event dispatched: ", event.type );
        this._executeEventHandlers(
            event, 
            super._getEventHandlers(event)
        );
    }
    override addEventListener(eventName: string, handler: NamedEventHandler): void {
        this.handlers.push(
            {
                event_name: eventName, 
                handler: handler
            }
        );
    }
}