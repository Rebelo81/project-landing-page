# Requirements Document

## Introduction

This feature involves simplifying the contact form on the DNC School landing page by removing the optional message field. The goal is to streamline the form submission process, making it more focused on collecting only essential information from potential students.

## Requirements

### Requirement 1

**User Story:** As a website administrator, I want to simplify the contact form by removing the optional message field, so that users can complete the form more quickly and we can focus on collecting only essential information.

#### Acceptance Criteria

1. WHEN a user visits the landing page THEN the contact form SHALL NOT display the message textarea field.
2. WHEN a user submits the form THEN the system SHALL process the submission without requiring or including message data.
3. WHEN the form is validated THEN the system SHALL only validate the remaining required fields (name, email, and phone).
4. WHEN the form is submitted THEN any JavaScript handling form submission SHALL function correctly without expecting message data.