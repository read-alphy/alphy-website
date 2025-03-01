import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import ArcForm from './ArcForm/ArcForm';

export default function ArcCreation({
  arcDescription,
  tier,
  arcTitle,
  setArcDescription,
  setArcTitle,
  sourceIDsArc,
  setSourceIDsArc,
  dataArc,
  setDataArc,
  errorMessage,
  credit,
  setCreditCalled,
  isCreateArc,
  isEditArc,
  isLoadingSubmit,
  onSave,
  onDelete,
}) {
  const { currentUser } = useAuth();

  return (
    <ArcForm
      arcTitle={arcTitle}
      arcDescription={arcDescription}
      setArcTitle={setArcTitle}
      setArcDescription={setArcDescription}
      sourceIDsArc={sourceIDsArc}
      setSourceIDsArc={setSourceIDsArc}
      dataArc={dataArc}
      setDataArc={setDataArc}
      currentUser={currentUser}
      tier={tier}
      credit={credit}
      errorMessage={errorMessage}
      setCreditCalled={setCreditCalled}
      isEditMode={false}
      isCreateArc={isCreateArc}
      isEditArc={isEditArc}
      isLoadingSubmit={isLoadingSubmit}
      onSave={onSave}
      onDelete={onDelete}
    />
  );
}