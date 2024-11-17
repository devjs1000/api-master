export const create_mappable = (
  array: any[],
  key_name?: string,
  value_name?: string
): Mappables => {
  const first_element = array[0];
  if (typeof first_element === "string") {
    return array.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }
  return array.map((item) => {
    return {
      label: item[key_name || "name"],
      value: item[value_name || "id"],
    };
  });
};
