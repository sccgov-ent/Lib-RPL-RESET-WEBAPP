export default function ResetRequest({ display, name }) {

  if (display) return <div>Submitted request for {name}</div>;
  return null;
}