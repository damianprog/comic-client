const ToggleHtmlScroll = (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : 'auto';
};

export default ToggleHtmlScroll;
