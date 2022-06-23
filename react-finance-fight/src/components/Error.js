// //////////////////////////////
// ERROR DISPLAY
// //////////////////////////////

import React from 'react';

export default function Error({children, style, ...props}) {
    const styles = {error:{color:'red'}}
    
    return (
        <div style={{...styles.error, ...style}} {...props}>{children}</div>
    )
}
