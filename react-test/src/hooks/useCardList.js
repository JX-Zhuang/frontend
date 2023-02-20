import { useCallback, useEffect, useRef, useState } from 'react';
import getCardList from '../api/card';
import CreateStore from '../store/CreateStore';
import createUseStore from '../store/createUseStore';
const useList = createUseStore(getCardList, '123');
export default useList;