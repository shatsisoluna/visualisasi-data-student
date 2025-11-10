// === VARIABEL GLOBAL ===
let allData = [];
let filteredData = [];
let tooltip;
let tooltipHideTimeout = null;

// Variabel filter global (Sets untuk checkbox)
let currentGender = new Set();
let currentAge = new Set();
let currentPartTime = new Set();
let currentDiet = new Set();
let currentParent = new Set();
let currentInternet = new Set();
let currentExtra = new Set();
let currentMentalMin = 1;
let currentExerciseMin = 0;

// --- Elemen D3 & Dimensi ---
let chartTopLeft1, chartTopLeft2, chartTopRight, chartBottomLeft1, chartBottomLeft2, chartBottomRight;

// === FUNGSI UTAMA SAAT HALAMAN DIMUAT ===
document.addEventListener('DOMContentLoaded', function() {
    
    tooltip = d3.select("#tooltip");
    
    // (BARU) Kita harus menunggu DOM benar-benar siap
    // Panggil setup setelah delay singkat untuk memastikan CSS layout selesai
    setTimeout(() => {
        setupAllCharts();
        setupControls();
        loadData();
    }, 100); // Delay 100ms untuk membiarkan CSS render
});

// --- (BARU) FUNGSI: Setup 5 kanvas SVG ---
// (Diperbarui untuk memilih .svg-container dan meng-append SVG)
function setupAllCharts() {
    
    // --- Top-Left 1 (Bar Chart Diet) ---
    const dietNode = d3.select("#diet-chart-container").node();
    const dietMargin = {top: 10, right: 10, bottom: 30, left: 50};
    chartTopLeft1 = {
        width: dietNode.clientWidth - dietMargin.left - dietMargin.right,
        height: dietNode.clientHeight - dietMargin.top - dietMargin.bottom,
        svg: d3.select("#diet-chart-container")
            .append("svg") // (BARU) Append SVG di sini
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${dietNode.clientWidth} ${dietNode.clientHeight}`)
            .append("g").attr("transform", `translate(${dietMargin.left}, ${dietMargin.top})`),
        margin: dietMargin
    };

    // --- Top-Left 2 (Bar Chart Parental) ---
    const parentNode = d3.select("#parent-chart-container").node();
    const parentMargin = {top: 10, right: 10, bottom: 30, left: 50};
    chartTopLeft2 = {
        width: parentNode.clientWidth - parentMargin.left - parentMargin.right,
        height: parentNode.clientHeight - parentMargin.top - parentMargin.bottom,
        svg: d3.select("#parent-chart-container")
            .append("svg") // (BARU) Append SVG di sini
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${parentNode.clientWidth} ${parentNode.clientHeight}`)
            .append("g").attr("transform", `translate(${parentMargin.left}, ${parentMargin.top})`),
        margin: parentMargin
    };

    // --- Top-Right (Main Scatter) ---
    const scatterMainNode = d3.select("#scatter-main-container").node();
    const scatterMainMargin = {top: 10, right: 30, bottom: 40, left: 60};
    chartTopRight = {
        width: scatterMainNode.clientWidth - scatterMainMargin.left - scatterMainMargin.right,
        height: scatterMainNode.clientHeight - scatterMainMargin.top - scatterMainMargin.bottom,
        svg: d3.select("#scatter-main-container")
            .append("svg") // (BARU) Append SVG di sini
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${scatterMainNode.clientWidth} ${scatterMainNode.clientHeight}`)
            .append("g").attr("transform", `translate(${scatterMainMargin.left}, ${scatterMainMargin.top})`),
        margin: scatterMainMargin
    };

    // --- Bottom-Left 1 (Sleep Scatter) ---
    const sleepNode = d3.select("#sleep-chart-container").node();
    const sleepMargin = {top: 10, right: 10, bottom: 40, left: 60};
    chartBottomLeft1 = {
        width: sleepNode.clientWidth - sleepMargin.left - sleepMargin.right,
        height: sleepNode.clientHeight - sleepMargin.top - sleepMargin.bottom,
        svg: d3.select("#sleep-chart-container")
            .append("svg") // (BARU) Append SVG di sini
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${sleepNode.clientWidth} ${sleepNode.clientHeight}`)
            .append("g").attr("transform", `translate(${sleepMargin.left}, ${sleepMargin.top})`),
        margin: sleepMargin
    };

    // --- Bottom-Left 2 (Social Scatter) ---
    const socialNode = d3.select("#social-chart-container").node();
    const socialMargin = {top: 10, right: 10, bottom: 40, left: 60};
    chartBottomLeft2 = {
        width: socialNode.clientWidth - socialMargin.left - socialMargin.right,
        height: socialNode.clientHeight - socialMargin.top - socialMargin.bottom,
        svg: d3.select("#social-chart-container")
            .append("svg") // (BARU) Append SVG di sini
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${socialNode.clientWidth} ${socialNode.clientHeight}`)
            .append("g").attr("transform", `translate(${socialMargin.left}, ${socialMargin.top})`),
        margin: socialMargin
    };

    // --- Bottom-Right (Histogram) ---
    const histoNode = d3.select("#histogram-container").node();
    const histoMargin = {top: 10, right: 30, bottom: 40, left: 60};
    chartBottomRight = {
        width: histoNode.clientWidth - histoMargin.left - histoMargin.right,
        height: histoNode.clientHeight - histoMargin.top - histoMargin.bottom,
        svg: d3.select("#histogram-container")
            .append("svg") // (BARU) Append SVG di sini
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${histoNode.clientWidth} ${histoNode.clientHeight}`)
            .append("g").attr("transform", `translate(${histoMargin.left}, ${histoMargin.top})`),
        margin: histoMargin
    };
}


// --- FUNGSI: Memuat Data ---
function loadData() {
    d3.dsv(";", "student_habits_performance.csv").then(function(data) {
        data.forEach(d => {
            d.study_hours_per_day = +d.study_hours_per_day;
            d.social_media_hours = +d.social_media_hours;
            d.netflix_hours = +d.netflix_hours;
            d.attendance_percentage = +d.attendance_percentage;
            d.sleep_hours = +d.sleep_hours;
            d.exam_score = +d.exam_score;
            d.mental_health_rating = +d.mental_health_rating;
            d.exercise_frequency = +d.exercise_frequency;
            d.age = +d.age;
            d.ageGroup = getAgeGroup(d.age);
        });
        allData = data;
        filteredData = allData;
        drawBarCharts(allData);
        updateDynamicCharts();
    });
}

// --- FUNGSI: Helper Grup Usia ---
function getAgeGroup(age) {
    if (age >= 18 && age <= 20) return "18-20";
    if (age >= 21 && age <= 23) return "21-23";
    if (age >= 24) return "24+";
    return "Other";
}

// --- FUNGSI: Setup Kontrol Filter ---
function setupControls() {
    // Age range controls (number inputs + single range controlling min)
    const ageMinInput = d3.select("#age-min-input");
    const ageMaxInput = d3.select("#age-max-input");
    const ageSlider = d3.select("#age-slider");

    if (!ageMinInput.empty() && !ageMaxInput.empty() && !ageSlider.empty()) {
        ageMinInput.on("input", function() {
            let minVal = +this.value;
            let maxVal = +ageMaxInput.property("value");
            if (isNaN(minVal)) minVal = 18;
            if (minVal < 18) minVal = 18;
            if (minVal > 30) minVal = 30;
            if (minVal > maxVal) { minVal = maxVal; this.value = minVal; }
            ageSlider.property("value", minVal);
            applyFiltersAndRedraw();
        });

        ageMaxInput.on("input", function() {
            let maxVal = +this.value;
            let minVal = +ageMinInput.property("value");
            if (isNaN(maxVal)) maxVal = 30;
            if (maxVal < 18) maxVal = 18;
            if (maxVal > 30) maxVal = 30;
            if (maxVal < minVal) { maxVal = minVal; this.value = maxVal; }
            applyFiltersAndRedraw();
        });

        ageSlider.on("input", function() {
            const val = +this.value;
            ageMinInput.property("value", val);
            applyFiltersAndRedraw();
        });
    }

    // Other controls
    d3.selectAll(".checkbox-group input").on("change", applyFiltersAndRedraw);
    d3.select("#mental-slider").on("input", function() {
        currentMentalMin = +d3.select(this).property("value");
        d3.select("#mental-value").text(currentMentalMin);
        applyFiltersAndRedraw();
    });
    d3.select("#exercise-slider").on("input", function() {
        currentExerciseMin = +d3.select(this).property("value");
        d3.select("#exercise-value").text(currentExerciseMin);
        applyFiltersAndRedraw();
    });
}

// --- FUNGSI: Menerapkan Filter & Menggambar Ulang ---
function applyFiltersAndRedraw() {
    currentGender = getCheckedValues("#gender-filter");
    // Try numeric age range first (if inputs present), otherwise use age-group checkboxes if any
    const ageMinEl = d3.select("#age-min-input");
    const ageMaxEl = d3.select("#age-max-input");
    let minAge = null, maxAge = null;
    if (!ageMinEl.empty() && !ageMaxEl.empty()) {
        minAge = +ageMinEl.property("value") || 18;
        maxAge = +ageMaxEl.property("value") || 30;
    } else {
        currentAge = getCheckedValues("#age-filter");
    }
    currentPartTime = getCheckedValues("#part-time-filter");
    currentDiet = getCheckedValues("#diet-filter");
    currentParent = getCheckedValues("#parent-filter");
    currentInternet = getCheckedValues("#internet-filter");
    currentExtra = getCheckedValues("#extra-filter");
    
    filteredData = allData.filter(d => {
        const genderMatch = (currentGender.size === 0) || currentGender.has(d.gender);
        const ageMatch = (minAge !== null && maxAge !== null)
            ? (d.age >= minAge && d.age <= maxAge)
            : ((currentAge && currentAge.size === 0) || (currentAge && currentAge.has(d.ageGroup)));
        const partTimeMatch = (currentPartTime.size === 0) || currentPartTime.has(d.part_time_job);
        const dietMatch = (currentDiet.size === 0) || currentDiet.has(d.diet_quality);
        const parentMatch = (currentParent.size === 0) || currentParent.has(d.parental_education_level);
        const internetMatch = (currentInternet.size === 0) || currentInternet.has(d.internet_quality);
        const extraMatch = (currentExtra.size === 0) || currentExtra.has(d.extracurricular_participation);
        const mentalMatch = d.mental_health_rating >= currentMentalMin;
        const exerciseMatch = d.exercise_frequency >= currentExerciseMin;
        return genderMatch && ageMatch && partTimeMatch && dietMatch && parentMatch && internetMatch && extraMatch && mentalMatch && exerciseMatch;
    });
    updateDynamicCharts();
}

function getCheckedValues(selector) {
    const values = new Set();
    d3.selectAll(`${selector} input:checked`).each(function() {
        values.add(d3.select(this).property("value"));
    });
    return values;
}

// --- FUNGSI: Menggambar Ulang 3 Chart Dinamis ---
function updateDynamicCharts() {
    // Memperbarui grafik batang (dengan animasi), lalu menggambar ulang grafik dinamis
    drawBarCharts(filteredData);
    chartTopRight.svg.selectAll("*").remove();
    chartBottomLeft1.svg.selectAll("*").remove();
    chartBottomLeft2.svg.selectAll("*").remove();
    chartBottomRight.svg.selectAll("*").remove();
    drawMainScatter(filteredData);
    drawSmallScatters(filteredData);
    drawHistogram(filteredData);
    setupBrush();
}


// --- FUNGSI: Menggambar Bar Charts (Top-Left - STATIS) ---
function drawBarCharts(data) {
    // menghitung nilai agregat untuk kedua grafik batang
    const dietData = d3.rollups(data, v => d3.mean(v, d => d.exam_score), d => d.diet_quality)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value);
    const parentData = d3.rollups(data, v => d3.mean(v, d => d.exam_score), d => d.parental_education_level)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value);

    // Fungsi pembantu untuk merender/menganimasi bar chart pada objek chart yang diberikan
function renderBarChart(chartObj, dataset, fillColor) {
    // Menyiapkan skala tetap
    const x = d3.scaleBand()
        .domain(dataset ? dataset.map(d => d.key) : ['No Data'])
        .range([0, chartObj.width])
        .padding(0.12);
    const y = d3.scaleLinear()
        .domain([0, 100])  // Menjaga domain y tetap
        .range([chartObj.height, 0]);

    // Menyiapkan elemen statis sekali saja
    if (chartObj.svg.select('.axis-group').empty()) {
        // Membuat grup untuk semua elemen statis
        const staticGroup = chartObj.svg.append('g')
            .attr('class', 'axis-group');
        
        // Membuat sumbu yang akan tetap di tempat
        staticGroup.append('g')
            .attr('class', 'y-axis axis')
            .call(d3.axisLeft(y).ticks(5));
            
        staticGroup.append('g')
            .attr('class', 'x-axis axis')
            .attr('transform', `translate(0, ${chartObj.height})`)
            .call(d3.axisBottom(x));
            
        // Menambahkan label sumbu permanen
        staticGroup.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - chartObj.margin.left + 15)
            .attr('x', 0 - (chartObj.height / 2))
            .attr('text-anchor', 'middle')
            .text('Rata-rata Nilai');
    }

    // Menangani dataset kosong
    if (!dataset || dataset.length === 0) {
        // Hapus bar dan tampilkan pesan
        chartObj.svg.selectAll('rect.bar').remove();
        
        // Show no-data message
        let noData = chartObj.svg.select('.no-data');
        if (noData.empty()) {
            noData = chartObj.svg.append('text')
                .attr('class', 'no-data')
                .attr('x', chartObj.width / 2)
                .attr('y', chartObj.height / 2)
                .attr('fill', '#94a3b8')
                .attr('text-anchor', 'middle');
        }
        noData.text('Tidak ada data untuk rentang usia ini');
        return;
    }

    // Menghapus pesan tidak ada data jika ada
    chartObj.svg.select('.no-data').remove();

    // Menghapus pesan tidak ada data jika ada
    chartObj.svg.select('.no-data').remove();

    // Penggabungan DATA untuk bar
    const bars = chartObj.svg.selectAll('rect.bar').data(dataset, d => d.key);

    // KELUAR: mengecilkan bar ke atas
    bars.exit()
        .transition().duration(450)
        .ease(d3.easeCubic)
        .attr('y', 0)
        .attr('height', 0)
        .remove();

    // PERBARUI: langsung atur posisi dan hanya animasikan warna
    bars.each(function(d) {
        const rect = d3.select(this);
        const newX = x(d.key);
        const newW = x.bandwidth();
        const newY = y(d.value);
        const newH = chartObj.height - newY;
        
        // Atur posisi dan ukuran secara langsung
        rect.attr('x', newX)
            .attr('width', newW)
            .attr('y', newY)
            .attr('height', newH);
            
        // Hanya animasikan warna isian
        rect.transition().duration(600)
            .ease(d3.easeCubic)
            .style('fill', fillColor);
    });

    // MASUK: muncul langsung di posisi akhir
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.key))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.value))
        .attr('height', d => chartObj.height - y(d.value))
        .style('fill', fillColor);
    }

    // render kedua grafik dengan animasi dan meneruskan hitungan kategori penuh
    renderBarChart(chartTopLeft1, dietData, 'var(--color-blue)');
    renderBarChart(chartTopLeft2, parentData, 'var(--color-green)');
}

// --- FUNGSI: Menggambar Scatter Plot (3 fungsi) ---
function drawMainScatter(data) {
    const xScale = d3.scaleLinear()
        .domain(d3.extent(allData, d => d.study_hours_per_day)).nice()
        .range([0, chartTopRight.width]);
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([chartTopRight.height, 0]);
    chartTopRight.svg.append("g").attr("class", "axis").attr("transform", `translate(0, ${chartTopRight.height})`).call(d3.axisBottom(xScale).ticks(5));
    chartTopRight.svg.append("text")
        .attr("class", "axis-label")
        .attr("x", chartTopRight.width / 2)
        .attr("y", chartTopRight.height + chartTopRight.margin.bottom - 5)
        .text("Jam Belajar per Hari");
    chartTopRight.svg.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
    chartTopRight.svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartTopRight.margin.left + 15)
        .attr("x", 0 - (chartTopRight.height / 2))
        .text("Nilai Ujian");
    // If filtered data is empty, show a friendly message and skip drawing points
    if (!data || data.length === 0) {
        chartTopRight.svg.append("text")
            .attr("x", chartTopRight.width / 2)
            .attr("y", chartTopRight.height / 2)
            .attr("fill", "#94a3b8")
            .attr("text-anchor", "middle")
            .attr("class", "no-data")
            .text("Tidak ada data untuk rentang usia ini");
        return;
    }

    chartTopRight.svg.selectAll(".dot")
        .data(data, d => d.student_id).enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.study_hours_per_day))
        .attr("cy", d => yScale(d.exam_score))
        .attr("r", 7)
        .call(addTooltipEvents);
}
function drawSmallScatters(data) {
    // --- Grafik 1: Tidur ---
    const xSleep = d3.scaleLinear()
        .domain(d3.extent(allData, d => d.sleep_hours)).nice()
        .range([0, chartBottomLeft1.width]);
    const ySleep = d3.scaleLinear()
        .domain([0, 100])
        .range([chartBottomLeft1.height, 0]);
    chartBottomLeft1.svg.append("g").attr("class", "axis").attr("transform", `translate(0, ${chartBottomLeft1.height})`).call(d3.axisBottom(xSleep).ticks(5));
    chartBottomLeft1.svg.append("text")
        .attr("class", "axis-label")
        .attr("x", chartBottomLeft1.width / 2)
        .attr("y", chartBottomLeft1.height + chartBottomLeft1.margin.bottom - 5)
        .text("Jam Tidur");
    chartBottomLeft1.svg.append("g").attr("class", "axis").call(d3.axisLeft(ySleep).ticks(5));
    chartBottomLeft1.svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartBottomLeft1.margin.left + 15)
        .attr("x", 0 - (chartBottomLeft1.height / 2))
        .text("Nilai Ujian");
    // --- Chart 2: Social Media ---
    const xSocial = d3.scaleLinear()
        .domain(d3.extent(allData, d => d.social_media_hours)).nice()
        .range([0, chartBottomLeft2.width]);
    const ySocial = d3.scaleLinear()
        .domain([0, 100])
        .range([chartBottomLeft2.height, 0]);
    chartBottomLeft2.svg.append("g").attr("class", "axis").attr("transform", `translate(0, ${chartBottomLeft2.height})`).call(d3.axisBottom(xSocial).ticks(5));
    chartBottomLeft2.svg.append("text")
        .attr("class", "axis-label")
        .attr("x", chartBottomLeft2.width / 2)
        .attr("y", chartBottomLeft2.height + chartBottomLeft2.margin.bottom - 5)
        .text("Jam Media Sosial");
    chartBottomLeft2.svg.append("g").attr("class", "axis").call(d3.axisLeft(ySocial).ticks(5));
    chartBottomLeft2.svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartBottomLeft2.margin.left + 15)
        .attr("x", 0 - (chartBottomLeft2.height / 2))
        .text("Nilai Ujian");

    // If no filtered data, show message in both small scatter panels and do not append dots
    if (!data || data.length === 0) {
        chartBottomLeft1.svg.append("text")
            .attr("x", chartBottomLeft1.width / 2)
            .attr("y", chartBottomLeft1.height / 2)
            .attr("fill", "#94a3b8")
            .attr("text-anchor", "middle")
            .attr("class", "no-data")
            .text("Tidak ada data untuk rentang usia ini");
        chartBottomLeft2.svg.append("text")
            .attr("x", chartBottomLeft2.width / 2)
            .attr("y", chartBottomLeft2.height / 2)
            .attr("fill", "#94a3b8")
            .attr("text-anchor", "middle")
            .attr("class", "no-data")
            .text("Tidak ada data untuk rentang usia ini");
        return;
    }

    // append dots when we have data
    chartBottomLeft1.svg.selectAll(".dot")
        .data(data, d => d.student_id).enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xSleep(d.sleep_hours))
        .attr("cy", d => ySleep(d.exam_score))
        .attr("r", 7)
        .call(addTooltipEvents);
    chartBottomLeft2.svg.selectAll(".dot")
        .data(data, d => d.student_id).enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xSocial(d.social_media_hours))
        .attr("cy", d => ySocial(d.exam_score))
        .attr("r", 7)
        .call(addTooltipEvents);
    
}

// --- FUNGSI: Menggambar Histogram (Bottom-Right) ---
function drawHistogram(data) {
    // Always draw axes even when there's no data so the panel doesn't disappear.
    const xHisto = d3.scaleLinear()
        .domain([0, 100])
        .range([0, chartBottomRight.width])
        .nice();
    chartBottomRight.xScale = xHisto;

    // Axis X
    chartBottomRight.svg.append("g").attr("class", "axis").attr("transform", `translate(0, ${chartBottomRight.height})`).call(d3.axisBottom(xHisto));
    chartBottomRight.svg.append("text")
        .attr("class", "axis-label")
        .attr("x", chartBottomRight.width / 2)
        .attr("y", chartBottomRight.height + chartBottomRight.margin.bottom - 5)
        .text("Nilai Ujian");

    if (!data || data.length === 0) {
        // No data: draw empty Y axis and a friendly message
        const yEmpty = d3.scaleLinear().domain([0, 1]).range([chartBottomRight.height, 0]);
        chartBottomRight.svg.append("g").attr("class", "axis").call(d3.axisLeft(yEmpty).ticks(1));
        chartBottomRight.svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartBottomRight.margin.left + 15)
            .attr("x", 0 - (chartBottomRight.height / 2))
            .text("Jumlah Mahasiswa");

        chartBottomRight.svg.append("text")
            .attr("x", chartBottomRight.width / 2)
            .attr("y", chartBottomRight.height / 2)
            .attr("fill", "#94a3b8")
            .attr("text-anchor", "middle")
            .attr("class", "no-data")
            .text("Tidak ada data untuk rentang usia ini");

        return;
    }

    // With data: compute bins and render bars
    const bins = d3.bin().value(d => d.exam_score).domain(xHisto.domain()).thresholds(xHisto.ticks(20))(data);
    const yHisto = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([chartBottomRight.height, 0]);
    chartBottomRight.svg.append("g").attr("class", "axis").call(d3.axisLeft(yHisto).ticks(5));
    chartBottomRight.svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartBottomRight.margin.left + 15)
        .attr("x", 0 - (chartBottomRight.height / 2))
        .text("Jumlah Mahasiswa");
    chartBottomRight.svg.selectAll("rect")
        .data(bins).enter().append("rect")
            .attr("class", "histo-bar")
            .attr("x", d => xHisto(d.x0) + 1)
            .attr("width", d => Math.max(0, xHisto(d.x1) - xHisto(d.x0) - 1))
            .attr("y", d => yHisto(d.length))
            .attr("height", d => chartBottomRight.height - yHisto(d.length));
}

// --- FUNGSI HELPER: Tooltip ---
function addTooltipEvents(selection) {
    // Render content for a datum
    function setTooltipContent(d) {
        return `
            <strong>Nilai: ${d.exam_score.toFixed(1)}</strong><br>
            Jam Belajar: ${d.study_hours_per_day} jam<br>
            Jam Medsos: ${d.social_media_hours} jam<br>
            Jam Tidur: ${d.sleep_hours} jam<br>
            Diet: ${d.diet_quality}<br>
            Pendidikan Ortu: ${d.parental_education_level}
        `;
    }

    // Position tooltip near cursor with basic collision handling
    function positionTooltip(event) {
        const pageX = event.pageX !== undefined ? event.pageX : (event.clientX + window.scrollX);
        const pageY = event.pageY !== undefined ? event.pageY : (event.clientY + window.scrollY);
        const offset = 12;
        const node = tooltip.node();
        const tw = node ? node.offsetWidth : 220;
        const th = node ? node.offsetHeight : 80;

        let left = pageX + offset;
        let top = pageY + offset;
        if (left + tw > window.innerWidth) left = pageX - tw - offset;
        if (top + th > window.innerHeight) top = pageY - th - offset;

        tooltip.style("left", left + "px").style("top", top + "px");
    }

    // Use enter/move/leave to avoid tooltip stealing pointer events
    selection
        .on("mouseenter", function(event, d) {
            // cancel pending hide
            if (tooltipHideTimeout) { clearTimeout(tooltipHideTimeout); tooltipHideTimeout = null; }
            tooltip.style("opacity", 1).html(setTooltipContent(d));
            // ensure tooltip is above other elements
            tooltip.style("z-index", 9999);
            positionTooltip(event);
        })
        .on("mousemove", function(event, d) {
            // keep visible and update position
            if (tooltipHideTimeout) { clearTimeout(tooltipHideTimeout); tooltipHideTimeout = null; }
            positionTooltip(event);
        })
        .on("mouseleave", function(event, d) {
            // delay hiding slightly to avoid flicker when pointer moves rapidly
            if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
            tooltipHideTimeout = setTimeout(() => {
                tooltip.style("opacity", 0);
                tooltipHideTimeout = null;
            }, 80);
        });
}

// --- FUNGSI INTERAKSI ---
function setupBrush() {
    if (filteredData.length === 0) return;
    const brush = d3.brushX()
        .extent([[0, 0], [chartBottomRight.width, chartBottomRight.height]])
        .on("brush end", brushed); 
    chartBottomRight.svg.append("g")
        .attr("class", "brush")
        .call(brush);
}
function brushed(event) {
    updateHighlight(event.selection);
}
function updateHighlight(selection) {
    let minScore = 0;
    let maxScore = 100;
    if (selection) {
        [minScore, maxScore] = selection.map(chartBottomRight.xScale.invert);
    }
    const updateDimming = (svgSelection) => {
        svgSelection.selectAll(".dot")
            .classed("dimmed", d => {
                const isInData = filteredData.find(fd => fd.student_id === d.student_id);
                if (!isInData) {
                    return false;
                }
                return d.exam_score < minScore || d.exam_score > maxScore;
            });
    };
    updateDimming(chartTopRight.svg);
    updateDimming(chartBottomLeft1.svg);
    updateDimming(chartBottomLeft2.svg);
}