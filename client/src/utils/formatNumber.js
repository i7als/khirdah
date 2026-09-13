// Always Western digits with thousands separators, regardless of UI
// language — matches the project's convention of keeping monetary
// figures LTR/Western everywhere (see dir="ltr" spans throughout).
export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}
