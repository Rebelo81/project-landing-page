# Design Document

## Overview

This design document outlines the approach for simplifying the contact form on the DNC School landing page by removing the optional message textarea field. The implementation will involve modifying the HTML structure of the form while ensuring that all related functionality continues to work properly.

## Architecture

The current architecture consists of:
- HTML structure (index.html) containing the form elements
- CSS styling (style.css) for form presentation
- JavaScript (main.js) for form validation and submission handling

The change will only affect the HTML structure, with potential minor adjustments to JavaScript if the message field is referenced in form validation or submission logic.

## Components and Interfaces

### HTML Component Changes

The primary change will be to remove the following HTML block from the contact form in index.html:

```html
<div class="form-group">
    <textarea id="mensagem" name="mensagem" placeholder="Mensagem (opcional)" class="form-input"></textarea>
    <span class="error-message" id="mensagem-error"></span>
</div>
```

### JavaScript Interface Considerations

We need to ensure that any JavaScript code that might reference the message field (such as form validation or submission handlers) is updated accordingly:

1. Check if there are any event listeners or validation functions specifically for the message field
2. Check if the form submission logic includes the message field in its data collection
3. Remove any references to the message field or its error element

## Data Models

The form data model will be simplified to include only:
- nome (name) - required
- email - required
- telefone (phone) - required

The "mensagem" (message) field will be removed from the data model.

## Error Handling

The error handling for the form will remain unchanged for the remaining fields. The error handling related to the message field will be removed, including:
- Any validation logic for the message field
- The error message span with id "mensagem-error"

## Testing Strategy

1. **Visual Testing**: Verify that the form renders correctly without the message field
2. **Functional Testing**: Test form submission to ensure it works properly without the message field
3. **Validation Testing**: Confirm that form validation works correctly for the remaining fields
4. **Responsive Testing**: Verify that the form layout adjusts properly on different screen sizes after the change