export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

export type LoggerOptions = {
  service: string;
  context?: LogContext;
  level?: LogLevel;
  format?: "pretty" | "json";
};

export type Logger = {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  child: (context: LogContext) => Logger;
};

const LOG_LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

const CONSOLE_METHOD: Record<LogLevel, "debug" | "info" | "warn" | "error"> = {
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error"
};

type ConsoleLike = Record<
  "debug" | "info" | "warn" | "error",
  (...data: unknown[]) => void
>;

type RuntimeGlobal = typeof globalThis & {
  console: ConsoleLike;
  process?: {
    env?: Record<string, string | undefined>;
  };
};

const runtime = globalThis as RuntimeGlobal;

function getRuntimeEnv(name: string): string | undefined {
  return runtime.process?.env?.[name];
}

function getDefaultLogLevel(): LogLevel {
  return getRuntimeEnv("LOG_LEVEL") === "debug" ? "debug" : "info";
}

function getDefaultLogFormat(): "pretty" | "json" {
  return getRuntimeEnv("NODE_ENV") === "production" ? "json" : "pretty";
}

function shouldLog(level: LogLevel, minimumLevel: LogLevel): boolean {
  return LOG_LEVEL_WEIGHT[level] >= LOG_LEVEL_WEIGHT[minimumLevel];
}

function normalizeValue(value: unknown): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack
    };
  }

  return value;
}

function normalizeContext(context: LogContext): LogContext {
  return Object.fromEntries(
    Object.entries(context).map(([key, value]) => [key, normalizeValue(value)])
  );
}

export function createLogger(options: LoggerOptions): Logger {
  const minimumLevel = options.level ?? getDefaultLogLevel();
  const format = options.format ?? getDefaultLogFormat();
  const baseContext = options.context ?? {};

  function write(level: LogLevel, message: string, context: LogContext = {}): void {
    if (!shouldLog(level, minimumLevel)) {
      return;
    }

    const logContext = normalizeContext({
      ...baseContext,
      ...context
    });

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      service: options.service,
      message,
      ...logContext
    };

    if (format === "json") {
      runtime.console[CONSOLE_METHOD[level]](JSON.stringify(entry));
      return;
    }

    const contextKeys = Object.keys(logContext);
    if (contextKeys.length === 0) {
      runtime.console[CONSOLE_METHOD[level]](
        `[${options.service}] ${level} ${message}`
      );
      return;
    }

    runtime.console[CONSOLE_METHOD[level]](
      `[${options.service}] ${level} ${message}`,
      logContext
    );
  }

  return {
    debug: (message, context) => write("debug", message, context),
    info: (message, context) => write("info", message, context),
    warn: (message, context) => write("warn", message, context),
    error: (message, context) => write("error", message, context),
    child: (context) =>
      createLogger({
        ...options,
        context: {
          ...baseContext,
          ...context
        },
        format,
        level: minimumLevel
      })
  };
}
