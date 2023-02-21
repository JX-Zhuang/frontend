import { useCallback, useEffect, useRef, useState } from 'react';
import getList from '../api/list';
import CreateStore from '../store/CreateStore';
import createUseStore from '../store/createUseStore';
const useList = createUseStore(getList);
export default useList;