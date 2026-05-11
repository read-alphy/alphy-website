export default function useArcData() {
  return {
    data: [],
    arcInfo: {},
    arcDescription: '',
    arcTitle: '',
    dataArc: [],
    sourceIDsArc: [],
    isVisible: false,
    isPublic: false,
    isLoading: false,
    authorizationError: true,
    updateArcState: () => {},
    fetchArcData: () => {},
  }
}
