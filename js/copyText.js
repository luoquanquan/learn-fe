const copyText = text => {
    const ele = document.createElement('input');
    ele.setAttribute('readonly', 'readonly');
    ele.setAttribute('value', text);
    document.body.appendChild(ele);

    // Android
    ele.select();
    // iOS
    ele.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(ele);
};

copyText('hello world ~')

/*
复制文本到粘贴板
*/
