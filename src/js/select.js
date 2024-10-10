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
        value: "Local Moving",
        text: "Local Moving",
      },
      {
        value: "Residential Moving",
        text: "Residential Moving",
      },
      {
        value: "Commercial and Office Moving",
        text: "Commercial and Office Moving",
      },
      {
        value: "Packing",
        text: "Packing",
      },
      {
        value: "Manpower Services",
        text: "Manpower Services",
      },
      {
        value: "Long Distance Moving",
        text: "Long Distance Moving",
      },
      {
        value: "Piano Moving",
        text: "Piano Moving",
      },
      {
        value: "Pool Tables and Safes",
        text: "Pool Tables and Safes",
      },
      {
        value: "Cleaning Services",
        text: "Cleaning Services",
      },
      {
        value: "Garbage Removal",
        text: "Garbage Removal",
      },
      {
        value: "Last Minute Moving",
        text: "Last Minute Moving",
      },
      {
        value: "Appliances",
        text: "Appliances",
      },
      {
        value: "Exercise Equipment",
        text: "Exercise Equipment",
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
