export const setActiveTab = (state, tab) => {
  state.activeTab = state.activeTab === tab ? '' : tab
}
