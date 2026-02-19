import { randomUUID } from "crypto";
import type { Form, Response } from "../types";

export const forms = new Map<string, Form>();

export const responses = new Map<string, Response[]>();

export const createId = (): string => randomUUID();

export const now = (): string => new Date().toISOString();
