import { get_request_store } from "@sveltejs/kit/internal/server";
import { c as create_validator, r as run_remote_function, g as get_cache, a as get_implicit_lookup, b as get_response, p as parse_remote_response, d as refresh } from "./chunks/query.js";
import { q } from "./chunks/query.js";
import { M as MUTATIVE_METHODS, a as create_field_proxy, b as normalize_issue, d as set_nested_value, f as flatten_issues, e as deep_set, s as stringify_remote_arg, n as noop, g as stringify, p as parse_remote_arg } from "./chunks/utils2.js";
import { ValidationError, HttpError } from "@sveltejs/kit/internal";
import { error, json } from "@sveltejs/kit";
import { b as base, a as app_dir } from "./chunks/server.js";
// @__NO_SIDE_EFFECTS__
function command(validate_or_fn, maybe_fn) {
  const fn = maybe_fn ?? validate_or_fn;
  const validate = create_validator(validate_or_fn, maybe_fn);
  const __ = { type: "command", id: "", name: "" };
  const wrapper = (arg) => {
    const { event, state } = get_request_store();
    if (!MUTATIVE_METHODS.includes(event.request.method)) {
      throw new Error(
        `Cannot call a command (\`${__.name}(${maybe_fn ? "..." : ""})\`) from a ${event.request.method} handler`
      );
    }
    if (state.is_in_render) {
      throw new Error(
        `Cannot call a command (\`${__.name}(${maybe_fn ? "..." : ""})\`) during server-side rendering`
      );
    }
    const promise = Promise.resolve(
      run_remote_function(event, state, true, () => validate(arg), fn)
    );
    promise.updates = () => {
      throw new Error(`Cannot call '${__.name}(...).updates(...)' on the server`);
    };
    return (
      /** @type {ReturnType<RemoteCommand<Input, Output>>} */
      promise
    );
  };
  Object.defineProperty(wrapper, "__", { value: __ });
  Object.defineProperty(wrapper, "pending", {
    get: () => 0
  });
  return wrapper;
}
// @__NO_SIDE_EFFECTS__
function form(validate_or_fn, maybe_fn) {
  const fn = maybe_fn ?? validate_or_fn;
  const schema = !maybe_fn || validate_or_fn === "unchecked" ? null : (
    /** @type {any} */
    validate_or_fn
  );
  function create_instance(key) {
    const instance = {};
    instance.method = "POST";
    Object.defineProperty(instance, "enhance", {
      value: () => {
        return { action: instance.action, method: instance.method };
      }
    });
    const __ = {
      type: "form",
      name: "",
      id: "",
      fn: async (data, meta, form_data) => {
        const output = {};
        output.submission = true;
        const { event, state } = get_request_store();
        const validated = await schema?.["~standard"].validate(data);
        if (meta.validate_only) {
          return validated?.issues?.map((issue) => normalize_issue(issue, true)) ?? [];
        }
        if (validated?.issues !== void 0) {
          handle_issues(output, validated.issues, form_data);
        } else {
          if (validated !== void 0) {
            data = validated.value;
          }
          const issue = create_issues();
          try {
            output.result = await run_remote_function(
              event,
              state,
              true,
              () => data,
              (data2) => !maybe_fn ? fn() : fn(data2, issue)
            );
          } catch (e) {
            if (e instanceof ValidationError) {
              handle_issues(output, e.issues, form_data);
            } else {
              throw e;
            }
          }
        }
        if (!event.isRemoteRequest) {
          const cache = get_cache(__, state);
          cache[""] ??= output;
          get_implicit_lookup(__, state)[__.action_id ?? __.id] = () => cache[""];
        }
        return output;
      }
    };
    Object.defineProperty(instance, "__", { value: __ });
    Object.defineProperty(instance, "action", {
      get: () => `?/remote=${__.id}`,
      enumerable: true
    });
    Object.defineProperty(instance, "fields", {
      get() {
        return create_field_proxy(
          {},
          () => get_cache(__, get_request_store().state)?.[""]?.input ?? {},
          (path, value) => {
            const cache = get_cache(__, get_request_store().state);
            const entry = cache[""];
            if (entry?.submission) {
              return;
            }
            if (path.length === 0) {
              (cache[""] ??= {}).input = value;
              return;
            }
            const input = entry?.input ?? {};
            deep_set(input, path.map(String), value);
            (cache[""] ??= {}).input = input;
          },
          () => flatten_issues(get_cache(__, get_request_store().state)?.[""]?.issues ?? [])
        );
      }
    });
    Object.defineProperty(instance, "result", {
      get() {
        try {
          return get_cache(__, get_request_store().state)?.[""]?.result;
        } catch {
          return void 0;
        }
      }
    });
    Object.defineProperty(instance, "pending", {
      get: () => 0
    });
    Object.defineProperty(instance, "submitted", {
      get: () => false
    });
    Object.defineProperty(instance, "preflight", {
      // preflight is a noop on the server
      value: () => instance
    });
    Object.defineProperty(instance, "validate", {
      value: () => {
        throw new Error("Cannot call validate() on the server");
      }
    });
    Object.defineProperty(instance, "submit", {
      value: () => {
        throw new Error("Cannot call submit() on the server");
      }
    });
    Object.defineProperty(instance, "element", {
      get: () => null
    });
    if (key == void 0) {
      Object.defineProperty(instance, "for", {
        /** @type {RemoteForm<any, any>['for']} */
        value: (key2) => {
          const { state } = get_request_store();
          const cache_key = __.id + "|" + JSON.stringify(key2);
          let instance2 = (state.remote.forms ??= /* @__PURE__ */ new Map()).get(cache_key);
          if (!instance2) {
            instance2 = create_instance(key2);
            instance2.__.id = `${__.id}/${encodeURIComponent(JSON.stringify(key2))}`;
            instance2.__.action_id = `${__.id}/${JSON.stringify(key2)}`;
            instance2.__.name = __.name;
            state.remote.forms.set(cache_key, instance2);
          }
          return instance2;
        }
      });
    }
    return instance;
  }
  return create_instance();
}
function handle_issues(output, issues, form_data) {
  output.issues = issues.map((issue) => normalize_issue(issue, true));
  if (form_data) {
    output.input = {};
    for (let key of form_data.keys()) {
      if (/^[.\]]?_/.test(key)) continue;
      const is_array = key.endsWith("[]");
      const values = form_data.getAll(key).filter((value) => typeof value === "string");
      if (is_array) key = key.slice(0, -2);
      set_nested_value(
        /** @type {Record<string, any>} */
        output.input,
        key,
        is_array ? values : values[0]
      );
    }
  }
}
function create_issues() {
  return (
    /** @type {InvalidField<any>} */
    new Proxy(
      /** @param {string} message */
      (message) => {
        if (typeof message !== "string") {
          throw new Error(
            "`invalid` should now be imported from `@sveltejs/kit` to throw validation issues. The second parameter provided to the form function (renamed to `issue`) is still used to construct issues, e.g. `invalid(issue.field('message'))`. For more info see https://github.com/sveltejs/kit/pulls/14768"
          );
        }
        return create_issue(message);
      },
      {
        get(target, prop) {
          if (typeof prop === "symbol") return (
            /** @type {any} */
            target[prop]
          );
          return create_issue_proxy(prop, []);
        }
      }
    )
  );
  function create_issue(message, path = []) {
    return {
      message,
      path
    };
  }
  function create_issue_proxy(key, path) {
    const new_path = [...path, key];
    const issue_func = (message) => create_issue(message, new_path);
    return new Proxy(issue_func, {
      get(target, prop) {
        if (typeof prop === "symbol") return (
          /** @type {any} */
          target[prop]
        );
        if (/^\d+$/.test(prop)) {
          return create_issue_proxy(parseInt(prop, 10), new_path);
        }
        return create_issue_proxy(prop, new_path);
      }
    });
  }
}
// @__NO_SIDE_EFFECTS__
function prerender(validate_or_fn, fn_or_options, maybe_options) {
  const maybe_fn = typeof fn_or_options === "function" ? fn_or_options : void 0;
  const options = maybe_options ?? (maybe_fn ? void 0 : fn_or_options);
  const fn = maybe_fn ?? validate_or_fn;
  const validate = create_validator(validate_or_fn, maybe_fn);
  const __ = {
    type: "prerender",
    id: "",
    name: "",
    has_arg: !!maybe_fn,
    inputs: options?.inputs,
    dynamic: options?.dynamic
  };
  const wrapper = (arg) => {
    const { event, state } = get_request_store();
    const payload = stringify_remote_arg(arg, state.transport);
    const promise = get_response(__, payload, state, async () => {
      const id = __.id;
      const url = `${base}/${app_dir}/remote/${id}${payload ? `/${payload}` : ""}`;
      if (!state.prerendering && true && !event.isRemoteRequest) {
        try {
          const response = await fetch(new URL(url, event.url.origin).href, {
            // in the unlikely event that an attacker is able to spoof the origin,
            // this protects us against SSRF (the attacker-controlled server cannot
            // trick us into making a request to an internal resource)
            redirect: "manual"
          });
          if (!response.ok) {
            throw new Error("Prerendered response not found");
          }
          const prerendered = (
            /** @type {RemoteFunctionResponse} */
            await response.json()
          );
          if (prerendered.type === "error") {
            error(prerendered.status, prerendered.error);
          }
          return parse_remote_response(prerendered.data, state.transport)._;
        } catch {
        }
      }
      if (state.prerendering?.remote_responses.has(url)) {
        return (
          /** @type {Promise<any>} */
          state.prerendering.remote_responses.get(url)
        );
      }
      const promise2 = run_remote_function(event, state, false, () => validate(arg), fn);
      if (state.prerendering) {
        state.prerendering.remote_responses.set(url, promise2);
      }
      const result = await promise2;
      if (state.prerendering) {
        const body = { type: "result", data: stringify({ _: result }, state.transport) };
        state.prerendering.dependencies.set(url, {
          body: JSON.stringify(body),
          response: json(body)
        });
      }
      return result;
    });
    promise.catch(noop);
    return (
      /** @type {RemoteResource<Output>} */
      promise
    );
  };
  Object.defineProperty(wrapper, "__", { value: __ });
  return wrapper;
}
function requested(query, limit) {
  const { event, state } = get_request_store();
  const internals = (
    /** @type {RemoteAnyQueryInternals | undefined} */
    /** @type {any} */
    query.__
  );
  if (internals?.type !== "query" && internals?.type !== "query_batch" && internals?.type !== "query_live") {
    throw new Error(
      "requested(...) expects a query function created with query(...), query.batch(...), or query.live(...)"
    );
  }
  const __ = internals;
  const requested2 = state.remote.requested;
  const payloads = requested2?.get(__.id) ?? [];
  if (!state.is_in_remote_form_or_command) {
    throw new Error(
      "requested(...) can only be called in the context of a command/form remote function"
    );
  }
  const [selected, skipped] = split_limit(payloads, limit);
  const record_failure = (payload, error2) => {
    const promise = Promise.reject(error2);
    promise.catch(noop);
    get_cache(__, state)[payload] = promise;
    refresh(event, state, __, payload, () => promise);
  };
  for (const payload of skipped) {
    record_failure(
      payload,
      new HttpError(
        400,
        `Requested refresh was rejected because it exceeded requested(${__.name}, ${limit}) limit`
      )
    );
  }
  const result = {
    *[Symbol.iterator]() {
      for (const payload of selected) {
        try {
          const parsed = parse_remote_arg(payload, state.transport);
          const validated = __.validate(parsed);
          if (is_thenable(validated)) {
            throw new Error(
              // TODO improve
              `requested(${__.name}, ${limit}) cannot be used with synchronous iteration because the query validator is async. Use \`for await ... of\` instead`
            );
          }
          yield { arg: validated, query: __.bind(payload, validated) };
        } catch (error2) {
          record_failure(payload, error2);
          continue;
        }
      }
    },
    async *[Symbol.asyncIterator]() {
      yield* race_all(selected, async (payload) => {
        try {
          const parsed = parse_remote_arg(payload, state.transport);
          const validated = await __.validate(parsed);
          return { arg: validated, query: __.bind(payload, validated) };
        } catch (error2) {
          record_failure(payload, error2);
          throw new Error(`Skipping ${__.name}(${payload})`, { cause: error2 });
        }
      });
    },
    async refreshAll() {
      if (__.type === "query_live") {
        throw new Error("refreshAll() is invalid for live queries. Use reconnectAll() instead.");
      }
      for await (const { query: query2 } of result) {
        void /** @type {RemoteQuery<Output>} */
        query2.refresh();
      }
    },
    async reconnectAll() {
      if (__.type !== "query_live") {
        throw new Error("reconnectAll() is invalid for regular queries. Use refreshAll() instead.");
      }
      for await (const { query: query2 } of result) {
        void /** @type {RemoteLiveQuery<Output>} */
        query2.reconnect();
      }
    }
  };
  return (
    /** @type {RequestedResult<Validated, Output>} */
    /** @type {unknown} */
    result
  );
}
function split_limit(array, limit) {
  if (limit === Infinity) {
    return [array, []];
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error("Limit must be a non-negative integer or Infinity");
  }
  return [array.slice(0, limit), array.slice(limit)];
}
function is_thenable(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && "then" in value;
}
async function* race_all(array, fn) {
  const pending = /* @__PURE__ */ new Set();
  for (const value of array) {
    const promise = Promise.resolve(fn(value)).then((result) => ({
      promise,
      value: result
    }));
    promise.catch(() => pending.delete(promise));
    pending.add(promise);
  }
  while (pending.size > 0) {
    try {
      const { promise, value } = await Promise.race(pending);
      pending.delete(promise);
      yield value;
    } catch {
    }
  }
}
export {
  command,
  form,
  prerender,
  q as query,
  requested
};
