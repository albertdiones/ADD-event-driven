import {test, expect} from "@jest/globals"
import {EventContainer} from '..';
import {Event} from "add_event_container";
import { LoggerInterface } from "add_logger";

test(
    "Logger test",
    () => {

        const logMessages: any[] = [];

        const mockLogger: LoggerInterface = {
            log: function (...messages: any[]): void {
                throw new Error("Wrong function");
            },
            error: function (...messages: any[]): void {
                throw new Error("Wrong function");
            },
            warn: function (...messages: any[]): void {
                throw new Error("Wrong function");
            },
            info: function (...messages: any[]): void {
                logMessages.push(messages.join("; "));
            },
            debug: function (...messages: any[]): void {
                throw new Error("Wrong function");
            }
        }

        const container = new EventContainer({ logger: mockLogger });

        const eventName = 'candles_updated';


        container.addEventListener(
            eventName,
            function handlerx123214123376() {
                // handler 1
            }
        );

        
        container.addEventListener(
            eventName,
            function handler212312321() {
                // handler 2
            }
        );

        container.addEventListener(
            eventName,
            () => {
                // handler 3
            }
        );


        container.dispatchEvent(new Event(eventName))

        expect(logMessages.join('; ')).toContain(eventName);

        
        expect(logMessages.join('; ')).toContain("Found 3 handlers");

        expect(logMessages.join('; ')).toContain("<unnamed>");

        expect(logMessages.join('; ')).toContain("handlerx123214123376");

        expect(logMessages.join('; ')).toContain("handler212312321");

        expect(logMessages.join('; ')).toContain("Executed 3 handlers");

        console.log(logMessages);
    }
);