interface Props {
  name: string;
}

export const WithProps = (props: Props) => (
  <div>
    <h1>Hello {props.name}!</h1>
  </div>
);
