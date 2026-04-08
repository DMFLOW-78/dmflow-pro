useEffect(() => {
  async function init() {
    const result = await checkUserAccess();

    if (!result.ok) {
      router.push(result.redirect);
      return;
    }

    setUser(result.user);
    loadFlows();
  }

  init();
}, []);