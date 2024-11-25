import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const use_navigations: NavigationHookType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search_params, set_search_params] = useSearchParams();

  const handle_navigate: HandleNavigateType = useCallback(
    (path, options) => {
      navigate(path, {
        replace: options?.replace || false,
        state: options?.state,
      });
    },
    [navigate]
  );

  const go_back: HandleGoBackType = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const update_search_params: UpdateSearchParamsType = useCallback(
    (params) => {
      const new_params = new URLSearchParams(search_params);
      for (const key in params) {
        if (params[key]) {
          new_params.set(key, params[key]);
        } else {
          new_params.delete(key);
        }
      }
      set_search_params(new_params);
    },
    [search_params, set_search_params]
  );

  return {
    handle_navigate,
    go_back,
    location,
    search_params,
    update_search_params,
  };
};
