/**
 * Validation utility functions for bug tracker
 */

const validateBugTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { isValid: false, error: 'Title is required and must be a string' };
  }
  
  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters long' };
  }
  
  if (trimmedTitle.length > 100) {
    return { isValid: false, error: 'Title must not exceed 100 characters' };
  }
  
  return { isValid: true, value: trimmedTitle };
};

const validateBugDescription = (description) => {
  if (!description || typeof description !== 'string') {
    return { isValid: false, error: 'Description is required and must be a string' };
  }
  
  const trimmedDescription = description.trim();
  if (trimmedDescription.length < 10) {
    return { isValid: false, error: 'Description must be at least 10 characters long' };
  }
  
  if (trimmedDescription.length > 500) {
    return { isValid: false, error: 'Description must not exceed 500 characters' };
  }
  
  return { isValid: true, value: trimmedDescription };
};

const validateBugSeverity = (severity) => {
  const validSeverities = ['low', 'medium', 'high', 'critical'];
  
  if (!severity) {
    return { isValid: true, value: 'medium' }; // Default value
  }
  
  if (!validSeverities.includes(severity)) {
    return { 
      isValid: false, 
      error: `Severity must be one of: ${validSeverities.join(', ')}` 
    };
  }
  
  return { isValid: true, value: severity };
};

const validateBugStatus = (status) => {
  const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
  
  if (!status) {
    return { isValid: true, value: 'open' }; // Default value
  }
  
  if (!validStatuses.includes(status)) {
    return { 
      isValid: false, 
      error: `Status must be one of: ${validStatuses.join(', ')}` 
    };
  }
  
  return { isValid: true, value: status };
};

const validateBugPriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high'];
  
  if (!priority) {
    return { isValid: true, value: 'medium' }; // Default value
  }
  
  if (!validPriorities.includes(priority)) {
    return { 
      isValid: false, 
      error: `Priority must be one of: ${validPriorities.join(', ')}` 
    };
  }
  
  return { isValid: true, value: priority };
};

const validateReporter = (reporter) => {
  if (!reporter || typeof reporter !== 'string') {
    return { isValid: false, error: 'Reporter is required and must be a string' };
  }
  
  const trimmedReporter = reporter.trim();
  if (trimmedReporter.length === 0) {
    return { isValid: false, error: 'Reporter cannot be empty' };
  }
  
  return { isValid: true, value: trimmedReporter };
};

const validateBugData = (bugData) => {
  const errors = [];
  const validatedData = {};
  
  // Validate title
  const titleValidation = validateBugTitle(bugData.title);
  if (!titleValidation.isValid) {
    errors.push(titleValidation.error);
  } else {
    validatedData.title = titleValidation.value;
  }
  
  // Validate description
  const descriptionValidation = validateBugDescription(bugData.description);
  if (!descriptionValidation.isValid) {
    errors.push(descriptionValidation.error);
  } else {
    validatedData.description = descriptionValidation.value;
  }
  
  // Validate severity
  const severityValidation = validateBugSeverity(bugData.severity);
  if (!severityValidation.isValid) {
    errors.push(severityValidation.error);
  } else {
    validatedData.severity = severityValidation.value;
  }
  
  // Validate status
  const statusValidation = validateBugStatus(bugData.status);
  if (!statusValidation.isValid) {
    errors.push(statusValidation.error);
  } else {
    validatedData.status = statusValidation.value;
  }
  
  // Validate priority
  const priorityValidation = validateBugPriority(bugData.priority);
  if (!priorityValidation.isValid) {
    errors.push(priorityValidation.error);
  } else {
    validatedData.priority = priorityValidation.value;
  }
  
  // Validate reporter
  const reporterValidation = validateReporter(bugData.reporter);
  if (!reporterValidation.isValid) {
    errors.push(reporterValidation.error);
  } else {
    validatedData.reporter = reporterValidation.value;
  }
  
  // Optional assignee validation
  if (bugData.assignee) {
    validatedData.assignee = bugData.assignee.trim();
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: validatedData
  };
};

module.exports = {
  validateBugTitle,
  validateBugDescription,
  validateBugSeverity,
  validateBugStatus,
  validateBugPriority,
  validateReporter,
  validateBugData
};