import React from 'react';
import ArcForm from './ArcForm/ArcForm';

export default function EditArc({
  arcInfo,
  setArcInfo,
  currentUser,
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
  return (
    <ArcForm
      arcInfo={arcInfo}
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
      isEditMode={true}
      isCreateArc={isCreateArc}
      isEditArc={isEditArc}
      isLoadingSubmit={isLoadingSubmit}
      onSave={onSave}
      onDelete={onDelete}
    />
  );
}