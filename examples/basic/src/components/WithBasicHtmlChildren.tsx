import { JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

export const WithBasicHtmlChildren = (props: Props) => (
  <div>
    <h1>Hello {props.children}!</h1>
  </div>
);
