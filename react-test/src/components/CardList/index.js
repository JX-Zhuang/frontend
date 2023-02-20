import React, { useEffect, useState, Suspense } from 'react';
import useCardList from '../../hooks/useCardList';
import CreateUserList from '../CreateUserList';
function CardList() {
    return <CreateUserList name="CardList" hook={useCardList} />;
}
export default CardList;
