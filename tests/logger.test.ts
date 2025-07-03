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
        container.dispatchEvent(new Event(eventName))

        expect(logMessages.join('; ')).toContain(eventName)
    }
);