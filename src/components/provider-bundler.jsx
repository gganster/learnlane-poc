
const ProviderBundler = ({providers, children}) => {
  const [Provider, props] = providers?.length ? providers[0] : [];
  return (
    <>
      {Provider ? 
        <Provider {...(props ?? {})}>
          <ProviderBundler providers={providers.slice(1)}>{children}</ProviderBundler>
        </Provider>
      : children}
    </>
  );
}

export default ProviderBundler;