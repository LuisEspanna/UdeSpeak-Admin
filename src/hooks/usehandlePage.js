import { cloneDeep } from 'lodash';
import { useState } from 'react';

const useHandlePage = ({ initialPages, initialPageIdx, onChange }) => {
  const [pages] = useState( initialPages ? cloneDeep(initialPages) : [] );
  const [totalPages] = useState( initialPages.length - 1 );
  const [pageIdx, setPageIdx] = useState( initialPageIdx || 0 );

  /**
   * Handles the previous idx selection
   */
  const handlePrevious = () => {
    if (pageIdx > 0) setPageIdx(prevIdx => prevIdx - 1);
    if (onChange) onChange();
  };

  /**
   * Handles the next idx selection
   */
  const handleNext = () => {
    if ( pageIdx < (pages?.length - 1) ) setPageIdx(prevIdx => prevIdx + 1);
    if (onChange) onChange();
  };

  return {
    /* State values */
    pages,
    pageIdx,
    totalPages,

    /* State functions */

    /* Functions */
    handlePrevious,
    handleNext
  };
};

export default useHandlePage;
