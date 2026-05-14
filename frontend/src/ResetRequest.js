/**
 * Component that displays a message once the control variable `display` is set.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.display - Whether to show the submitted request message.
 * @param {string} props.name - The name for which the request was submitted.
 * @returns {JSX.Element|null} The submitted request message or null if not displayed.
 */
export default function ResetRequest({ display, name }) {

  if (display) return <div>Submitted request for {name}</div>;
  return null;
}