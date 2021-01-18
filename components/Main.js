export function Main(props) {
  return (
    <div
      style={{
        flex: 1,
        paddingTop: '1rem',
        padding: '1rem',
      }}
    >
      {props.children}
    </div>
  );
}
