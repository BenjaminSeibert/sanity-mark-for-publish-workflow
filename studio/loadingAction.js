export function LoadingAction(props) {

  if (props.ready) {
    return null
  }

  return {
    disabled: true,
    label: "Loading..."
  }
}