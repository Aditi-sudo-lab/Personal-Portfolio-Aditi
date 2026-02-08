const techForm = document.getElementById("techForm");
const techList = document.getElementById("techList");

techForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const skillName = document.getElementById("techName").value;
  const skillPercent = document.getElementById("techPercent").value;

  const li = document.createElement("li");
  li.className = "mb-4";
  li.innerHTML = `
    <div class="space-y-1">
      <div class="flex justify-between text-black-800 font-semibold">
        <span>${skillName}</span>
        <span>${skillPercent}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div class="bg-pink-500 h-3 rounded-full" style="width: ${skillPercent}%;"></div>
      </div>
      <button class="text-red-500 font-bold mt-2">Remove</button>
    </div>
  `;

  li.querySelector("button").addEventListener("click", () => li.remove());
  techList.appendChild(li);
  techForm.reset();
});