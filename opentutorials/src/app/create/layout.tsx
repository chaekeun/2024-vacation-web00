type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <>
      <h2>Create : Routing, props, Layout의 중첩을 배우는 page</h2>
      {props.children}
    </>
  );
}
