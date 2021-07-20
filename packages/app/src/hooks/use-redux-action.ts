import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useReduxAction = <AC>(actionCreator: AC): AC => {
  const dispatch = useDispatch();

  return useMemo(
    () =>
      (...args: AC extends (...args: infer Args) => any ? Args : any[]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(actionCreator(...(args as never[])));
      },
    [actionCreator]
  ) as any as AC;
};
