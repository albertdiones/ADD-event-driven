import { Event, EventContainer as OriginalEventContainer } from "add_event_container";
import Logger, { LoggerInterface } from "add_logger";

interface MongoLog {
    eventType: string;
    handlerName: string;
    eventDate: Date,
    executionDate: Date;
    finishDate: Date;
    save(): Promise<this>;
}

export class EventContainer extends OriginalEventContainer {


    logger?: LoggerInterface;
    mongoLog?: MongoLog;

    constructor(options?: { 
            logger?: LoggerInterface,
            mongoLog?: MongoLog 
        }
    ) {
        super();
        this.logger = options?.logger;
        this.mongoLog = options?.mongoLog;
    }
    
    override _executeEventHandlers(event: Event, handlers: EventHandler[]): void {
        const eventDate = new Date();
        handlers.map(
            (handler: EventHandler) => {
                const executionDate = new Date();
                handler(event) // should pass event details/context
                const finishDate = new Date();
                new [this.mongoLog]()
            }
        );
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