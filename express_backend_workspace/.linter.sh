#!/bin/bash
cd /home/kavia/workspace/code-generation/remixport-personal-portfolio--blog-67161-5435012d/express_backend_workspace/express_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

