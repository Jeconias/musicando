import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/core/store';

const useReduxDispatch = () => useDispatch<AppDispatch>();

export default useReduxDispatch;
