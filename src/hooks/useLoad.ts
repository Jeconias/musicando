import {useContext} from 'react';
import {LoadContext} from '~/providers/LoadProvider';

const useLoad = () => useContext(LoadContext);

export default useLoad;
