export const handleSelect = (ev, listName) => {
  const customOptionsWrap = ev.target.nextElementSibling;
  customOptionsWrap.classList.add("is-show");

  //  Adding custom select options in modal input
  for (const list of selectLists) {
    if (list.name === listName) {
      customOptionsWrap.innerHTML = list.options
        .map(
          (option) =>
            `<span class="select-custom-list-item" data-select="${option.value}">${option.text}</span>`
        )
        .join("");
    }
  }
  // Save user choice and close custom select modal
  customOptionsWrap.addEventListener("click", (sel) => {
    let userSelect = sel.target.dataset.select;
    ev.target.value = userSelect;
    customOptionsWrap.classList.remove("is-show");
  });
};

// Variants for custom select lists

export const selectLists = [
  {
    name: "service",
    options: [
      {
        value: "Residential/Commercial moving",
        text: "Residential/Commercial moving",
      },
      {
        value: "Long distance",
        text: "Long distance",
      },
      {
        value: "Furniture delivery",
        text: "Furniture delivery",
      },
      {
        value: "Internal (No truck)",
        text: "Internal (No truck)",
      },
      {
        value: "Cold/hot tub",
        text: "Cold/hot tub",
      },
      {
        value: "Piano",
        text: "Piano",
      },
      {
        value: "Gym",
        text: "Gym",
      },
    ],
  },
  {
    name: "requirement",
    options: [
      {
        value: "House",
        text: "House",
      },
      {
        value: "Apartment",
        text: "Apartment",
      },
      {
        value: "Office",
        text: "Office",
      },
      {
        value: "Storage",
        text: "Storage",
      },
      {
        value: "Clinic",
        text: "Clinic",
      },
      {
        value: "Gym",
        text: "Gym",
      },
    ],
  },
];
