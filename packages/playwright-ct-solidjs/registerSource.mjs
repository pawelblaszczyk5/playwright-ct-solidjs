/**
 * Copyright 2022 pawelblaszczyk5.
 * MIT License
 *
 * Portions of this file are based on code from @playwright/experimental-ct-react
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check

import { render } from "solid-js/web";
import h from "solid-js/h";

/** @typedef {import('./extracted').Component} Component */
/** @typedef {import('solid-js').Component} FrameworkComponent */

/** @type {Map<string, FrameworkComponent>} */
const registry = new Map();

/**
 * @param {{[key: string]: FrameworkComponent}} components
 */
export function register(components) {
  for (const [name, value] of Object.entries(components))
    registry.set(name, value);
}

/**
 * @param {Component} component
 */
function getComponent(component) {
  let componentFunc = registry.get(component.type);

  if (!componentFunc) {
    for (const [name, value] of registry) {
      if (component.type.endsWith(`_${name}`)) {
        componentFunc = value;
        break;
      }
    }
  }

  if (!componentFunc && component.type[0].toUpperCase() === component.type[0])
    throw new Error(
      `Unregistered component: ${
        component.type
      }. Following components are registered: ${[...registry.keys()]}`
    );

  const componentFuncOrString = componentFunc || component.type;

  return componentFuncOrString;
}

/**
 * @param {Component} component
 */
function renderComponent(component) {
  if (component.kind !== "jsx")
    throw new Error("Object mount notation is not supported");

  const componentFromRegistry = getComponent(component);

  return h(
    componentFromRegistry,
    component.props,
    resolveChildren(component.children)
  );
}

function resolveChildren(children) {
  if (Array.isArray(children)) {
    return children
      .map((child) => {
        if (typeof child === "string") return child;

        return () => renderComponent(child);
      })
      .filter((child) => {
        if (typeof child === "string") return !!child.trim();
        return true;
      });
  }

  return children;
}

window.playwrightMount = (component) => {
  let rootElement = document.getElementById("root");

  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.append(rootElement);
  }

  render(() => renderComponent(component), rootElement);

  return rootElement.childNodes.length > 1 ? "#root" : "#root > *";
};
