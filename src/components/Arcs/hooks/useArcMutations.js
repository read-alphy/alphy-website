export default function useArcMutations() {
  return {
    isLoadingSubmit: false,
    isLoadingDelete: false,
    isLoadingVisibility: false,
    error: 'Arcs are no longer available.',
    handleCreateOrUpdateArc: async () => false,
    handleDeleteArc: async () => false,
    handleVisibility: async (_arcUid, currentVisibility) => currentVisibility,
    clearError: () => {},
  }
}
