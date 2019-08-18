function initGrid(selector, images) {
  const grid = document.getElementById(selector);
  if (grid) {
    for (let i = 0; i < images.length; i += 2) {
      const location = images[i];
      const comment = images[i+1];

      const wrapper = document.createElement('div');
      wrapper.classList.add('wrap');

      const div = document.createElement('div');
      div.classList.add('image');

      const a = document.createElement('a');
      a.href = location;
      a.target = '_blank';

      const img = document.createElement('img');
      img.src = location;
      img.alt = comment;
      img.title = comment;

      const label = document.createElement('label');
      label.innerText = comment;

      a.appendChild(img);
      div.appendChild(a);
      wrapper.appendChild(div);
      wrapper.appendChild(label);
      grid.appendChild(wrapper);
    }
  }
}