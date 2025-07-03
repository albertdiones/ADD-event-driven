import { Event, EventContainer as OriginalEventContainer } from "add_event_container";
import Logger, { LoggerInterface } from "add_logger";

export class EventContainer extends OriginalEventContainer {


    logger?: LoggerInterface;

    constructor(options?: { logger: LoggerInterface }) {
        super();
        this.logger = options?.logger;
    }
    override dispatchEvent(event: Event): void {
        this.logger?.info( "Event dispatched: ", event.type );

        const handlers = super._getEventHandlers(event);

        this.logger?.info(
            `Found ${handlers.length} handlers `, 
            handlers.map(
                (handler) => handler.name ? handler.name : "<unnamed>"
            )
        );

        this._executeEventHandlers(
            event, 
            handlers
        );
        
        this.logger?.info(`Executed ${handlers.length} handlers`);
    }
}