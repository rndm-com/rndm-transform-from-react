const plugin = ({ key, library }) => {
  Object.keys(library).reduce((o, i) => {
    const Comp = library[i];
    if (Comp.displayName) {
      Comp.displayName = `${key}.${Comp.displayName}`;
      return ({ ...o, [i.displayName]: Comp });
    }
    return o;
  }, {});
};

export default plugin;
