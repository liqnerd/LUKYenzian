// PUJCOVNA Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePujcovna();
});

// Initialize Pujcovna page functionality
function initializePujcovna() {
    // Add click handlers for buttons
    const pricingBtn = document.querySelector('.pricing-btn');
    const onlineReservationBtn = document.querySelector('.action-btn:first-of-type');
    const guideBtn = document.querySelector('.action-btn:last-of-type');
    
    // Pricing button click - scroll to pricing table
    if (pricingBtn) {
        pricingBtn.addEventListener('click', () => {
            const pricingSection = document.querySelector('.pricing-table-section');
            if (pricingSection) {
                pricingSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Online reservation button click - scroll to reservation form
    if (onlineReservationBtn) {
        onlineReservationBtn.addEventListener('click', () => {
            const reservationSection = document.querySelector('.reservation-section');
            if (reservationSection) {
                reservationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Guide button click - scroll to guide section
    if (guideBtn) {
        guideBtn.addEventListener('click', () => {
            const guideSection = document.querySelector('.guide-section');
            if (guideSection) {
                guideSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Phone number click to call
    const phoneElement = document.querySelector('.phone');
    if (phoneElement) {
        phoneElement.style.cursor = 'pointer';
        phoneElement.addEventListener('click', () => {
            window.location.href = 'tel:+420608019418';
        });
    }
    
    // Initialize interactive bike points
    initializeBikePoints();
    
    // Initialize reservation form
    setTimeout(() => {
        initializeReservationForm();
    }, 100); // Small delay to ensure DOM is ready
}

// Interactive Bike Points Functionality
function initializeBikePoints() {
    const bikePoints = document.querySelectorAll('.bike-point');
    
    bikePoints.forEach(point => {
        // Add click functionality
        point.addEventListener('click', (e) => {
            e.preventDefault();
            const info = point.getAttribute('data-info');
            handlePointClick(info, point);
        });
        
        // Add hover effects
        point.addEventListener('mouseenter', () => {
            point.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        point.addEventListener('mouseleave', () => {
            point.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Add staggered animation delay for visual appeal
        const delay = Array.from(bikePoints).indexOf(point) * 0.3;
        const pulseRing = point.querySelector('.pulse-ring');
        if (pulseRing) {
            pulseRing.style.animationDelay = `${delay}s`;
        }
    });
}

// Handle point click events
function handlePointClick(info, pointElement) {
    // Create a temporary highlight effect
    const highlight = document.createElement('div');
    highlight.className = 'point-highlight';
    highlight.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        border: 3px solid #8B7355;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: highlight 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 15;
    `;
    
    // Add highlight animation CSS if not exists
    if (!document.getElementById('highlight-animation')) {
        const style = document.createElement('style');
        style.id = 'highlight-animation';
        style.textContent = `
            @keyframes highlight {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    pointElement.appendChild(highlight);
    
    // Remove highlight after animation
    setTimeout(() => {
        if (highlight.parentNode) {
            highlight.parentNode.removeChild(highlight);
        }
    }, 600);
    
    // Show info (you can customize this)
    console.log(`Clicked on: ${info}`);
    
    // Example: Show a tooltip or modal with bike part information
    showBikePartInfo(info, pointElement);
}

// Show bike part information
function showBikePartInfo(partName, element) {
    // Create a simple tooltip (you can enhance this)
    const existingTooltip = document.querySelector('.bike-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'bike-tooltip';
    tooltip.textContent = `${partName} - Click for more details`;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 20;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation: fadeInTooltip 0.3s ease forwards;
    `;
    
    // Add tooltip animation
    if (!document.getElementById('tooltip-animation')) {
        const style = document.createElement('style');
        style.id = 'tooltip-animation';
        style.textContent = `
            @keyframes fadeInTooltip {
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.appendChild(tooltip);
    
    // Remove tooltip after 2 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
}

// Note: Navigation and header scroll effects are handled by the main script.js file

// Initialize reservation form functionality
function initializeReservationForm() {
    console.log('Initializing reservation form...'); // Debug log
    const form = document.getElementById('reservationForm');
    const addBikeBtn = document.querySelector('.add-bike-btn');
    const removeBikeBtn = document.querySelector('.remove-bike-btn');
    let bikeCount = 1; // Track number of bikes
    
    console.log('Form found:', form); // Debug log
    console.log('Add bike button found:', addBikeBtn); // Debug log
    console.log('Remove bike button found:', removeBikeBtn); // Debug log
    
    // Initially disable remove button since we have only 1 bike
    if (removeBikeBtn) {
        removeBikeBtn.disabled = true;
    }
    
    // Handle add bike button
    if (addBikeBtn) {
        addBikeBtn.addEventListener('click', function() {
            console.log('Add bike clicked, current bike count:', bikeCount); // Debug log
            bikeCount++;
            console.log('Adding bike fields for bike:', bikeCount); // Debug log
            addBikeFields(bikeCount);
            
            // Enable remove button since we now have more than 1 bike
            if (removeBikeBtn) {
                removeBikeBtn.disabled = false;
            }
        });
    }
    
    // Handle remove bike button
    if (removeBikeBtn) {
        removeBikeBtn.addEventListener('click', function() {
            if (bikeCount > 1) {
                console.log('Remove bike clicked, removing bike:', bikeCount); // Debug log
                removeLastBikeFields();
                bikeCount--;
                console.log('New bike count:', bikeCount); // Debug log
                
                // Disable remove button if we're back to 1 bike
                if (bikeCount === 1) {
                    this.disabled = true;
                }
            }
        });
    }
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

// Handle form submission and email sending
async function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'ODESÍLÁM...';
    
    try {
        // Collect form data (including multiple bikes)
        const emailData = collectFormData(form);
        
        // Validate form data
        if (!validateFormData(emailData)) {
            throw new Error('Prosím vyplňte všechna povinná pole správně.');
        }
        
        // Send email using EmailJS
        await sendReservationEmail(emailData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form and remove additional bike fields
        form.reset();
        resetBikeFields();
        
    } catch (error) {
        // Show error message
        showErrorMessage(error.message);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'ODESLAT';
    }
}

// Validate form data (updated for multiple bikes)
function validateFormData(data) {
    // Check required basic fields
    if (!data.name || !data.email || !data.phone || !data.dateFrom || !data.dateTo) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate date range
    const fromDate = new Date(data.dateFrom);
    const toDate = new Date(data.dateTo);
    if (toDate <= fromDate) {
        return false;
    }
    
    // Validate bike data
    if (!data.bikes || data.bikes.length === 0) {
        return false;
    }
    
    // Check each bike has valid height and weight
    for (const bike of data.bikes) {
        if (!bike.height || !bike.weight) {
            return false;
        }
        if (bike.height < 120 || bike.height > 220) {
            return false;
        }
        if (bike.weight < 30 || bike.weight > 150) {
            return false;
        }
    }
    
    return true;
}

// Send email using EmailJS or backend service
async function sendReservationEmail(data) {
    // Create bike details string
    const bikeDetails = data.bikes.map(bike => 
        `Kolo ${bike.number}: Výška ${bike.height} cm, Hmotnost ${bike.weight} kg`
    ).join('\n        ');
    
    // Create email content
    const emailContent = `
        Nová rezervace ebike:
        
        Jméno: ${data.name}
        Email: ${data.email}
        Telefon: ${data.phone}
        Datum od: ${data.dateFrom}
        Datum do: ${data.dateTo}
        Počet kol: ${data.bikes.length}
        ${bikeDetails}
        Průvodce: ${data.guide || 'Nespecifikováno'}
        Poznámky: ${data.notes || 'Žádné'}
    `;
    
    // For a simple implementation, we'll use mailto (opens email client)
    // In production, you would use EmailJS, a backend service, or form service like Formspree
    const mailtoLink = `mailto:rezervace@enzian.cz?subject=Nová rezervace eBike - ${data.name}&body=${encodeURIComponent(emailContent)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Promise.resolve();
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #AFBB30;
        color: white;
        padding: 2rem 3rem;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    message.textContent = '✅ Rezervace byla úspěšně odeslána!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Show error message
function showErrorMessage(errorMsg) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #dc3545;
        color: white;
        padding: 2rem 3rem;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    message.textContent = '❌ ' + errorMsg;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 4000);
}

// Add bike fields for additional bikes
function addBikeFields(bikeNumber) {
    console.log('addBikeFields called for bike number:', bikeNumber); // Debug log
    const form = document.getElementById('reservationForm');
    const bikeButtonsRow = document.querySelector('.bike-buttons-row');
    
    console.log('Form found:', form); // Debug log
    console.log('Bike buttons row found:', bikeButtonsRow); // Debug log
    
    // Create bike section container
    const bikeSection = document.createElement('div');
    bikeSection.className = 'bike-section';
    bikeSection.setAttribute('data-bike', bikeNumber);
    
    // Create bike label
    const bikeLabel = document.createElement('div');
    bikeLabel.className = 'bike-label';
    bikeLabel.textContent = `eBike ${bikeNumber}`;
    
    // Create height field
    const heightRow = document.createElement('div');
    heightRow.className = 'form-row';
    const heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.className = 'form-input';
    heightInput.placeholder = 'Vaše výška';
    heightInput.name = `height_${bikeNumber}`;
    heightInput.min = '120';
    heightInput.max = '220';
    heightInput.required = true;
    heightRow.appendChild(heightInput);
    
    // Create weight field
    const weightRow = document.createElement('div');
    weightRow.className = 'form-row';
    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.className = 'form-input';
    weightInput.placeholder = 'Vaše hmotnost';
    weightInput.name = `weight_${bikeNumber}`;
    weightInput.min = '30';
    weightInput.max = '150';
    weightInput.required = true;
    weightRow.appendChild(weightInput);
    
    // Add elements to bike section
    bikeSection.appendChild(bikeLabel);
    bikeSection.appendChild(heightRow);
    bikeSection.appendChild(weightRow);
    
    // Insert before the bike buttons row
    console.log('Inserting bike section before bike buttons'); // Debug log
    form.insertBefore(bikeSection, bikeButtonsRow);
    console.log('Bike section added successfully'); // Debug log
}

// Remove the last added bike fields
function removeLastBikeFields() {
    const bikeSections = document.querySelectorAll('.bike-section');
    console.log('Found bike sections:', bikeSections.length); // Debug log
    
    if (bikeSections.length > 1) { // Keep at least the first bike (eBike 1)
        // Find the section with the highest bike number
        let highestBikeNumber = 0;
        let sectionToRemove = null;
        
        bikeSections.forEach(section => {
            const bikeNumber = parseInt(section.getAttribute('data-bike'));
            console.log('Section bike number:', bikeNumber); // Debug log
            if (bikeNumber > highestBikeNumber) {
                highestBikeNumber = bikeNumber;
                sectionToRemove = section;
            }
        });
        
        if (sectionToRemove && highestBikeNumber > 1) { // Don't remove eBike 1
            console.log('Removing section for bike:', highestBikeNumber); // Debug log
            sectionToRemove.remove();
        }
    }
}

// Update form data collection to handle multiple bikes
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateFrom: formData.get('dateFrom'),
        dateTo: formData.get('dateTo'),
        guide: formData.get('guide'),
        notes: formData.get('notes'),
        bikes: []
    };
    
    // Collect bike data from all bike sections
    const bikeSections = document.querySelectorAll('.bike-section');
    
    bikeSections.forEach(section => {
        const bikeNumber = parseInt(section.getAttribute('data-bike'));
        const height = bikeNumber === 1 ? 
            formData.get('height') : 
            formData.get(`height_${bikeNumber}`);
        const weight = bikeNumber === 1 ? 
            formData.get('weight') : 
            formData.get(`weight_${bikeNumber}`);
            
        if (height && weight) {
            data.bikes.push({
                number: bikeNumber,
                height: height,
                weight: weight
            });
        }
    });
    
    return data;
}

// Reset bike fields to initial state
function resetBikeFields() {
    // Remove all additional bike sections (keep eBike 1)
    const bikeSections = document.querySelectorAll('.bike-section');
    bikeSections.forEach(section => {
        const bikeNumber = parseInt(section.getAttribute('data-bike'));
        if (bikeNumber > 1) {
            section.remove();
        }
    });
    
    // Reset the remove bike button to disabled state
    const removeBikeBtn = document.querySelector('.remove-bike-btn');
    if (removeBikeBtn) {
        removeBikeBtn.disabled = true;
    }
    
    // Note: bikeCount will be reset in the closure when the form is reinitialized
}
