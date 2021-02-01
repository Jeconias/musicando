import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {RootState} from '~/core/store';

const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useReduxSelector;
