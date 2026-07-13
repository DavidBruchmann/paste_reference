# GitHub Actions Workflows

This directory contains the CI/CD workflows for the TYPO3 paste-reference extension.

## Workflows

### ci.yml
Main CI workflow that runs on every push and pull request. Includes:
- Code quality checks (PHP linting, CGL, PHPStan)
- Documentation rendering

**Triggers:**
- Push to any branch
- Pull request events (opened, edited, reopened, synchronize, ready_for_review)
- Manual dispatch

### nightly-main.yml
Scheduled nightly runs on the main branch.

**Triggers:**
- Scheduled: Daily at 05:42 UTC
- Manual dispatch

**Behavior:**
- Runs full CI suite
- Runs complete multi-version tests (force_full_test=true)

### publish.yaml
Handles publishing to TYPO3 Extension Repository (TER).

**Triggers:**
- Push of version tags (format: x.y.z)

## Workflow Integration

The workflows are designed to work together:

1. **ci.yml** runs basic quality checks and integrates with multi-version testing
3. **nightly-main.yml** ensures regular full testing of the main branch
4. **publish.yaml** handles release automation

## Configuration

### Manual Dispatch Parameters

The multi-version workflow supports manual execution with parameters:
- `typo3_versions`: Comma-separated list of TYPO3 versions to test
- `php_versions`: Comma-separated list of PHP versions to test
- `force_full_test`: Boolean to force full test suite execution

### Status Checks

Required status checks for pull requests:
- Code quality checks (from ci.yml)

## Troubleshooting

### Common Issues

1. **Docker build failures**: Check if base images are available and Dockerfile syntax
2. **Test timeouts**: Increase timeout values or optimize test execution
3. **Cache issues**: Clear caches or update cache keys
4. **Permission errors**: Ensure proper file permissions in Docker containers
5. **PHP version not supported**: If you get "Invalid option" errors for PHP versions, check:
   - The `Build/Scripts/runTests.sh` script supports the PHP version (update regex if needed)
   - TYPO3 core testing Docker images are available for that PHP version
   - TYPO3 version compatibility with the PHP version

### Debugging

- Use `workflow_dispatch` with specific parameters to test individual configurations
- Check workflow logs for detailed error messages
- Review test artifacts uploaded by failed runs
- Use the nightly workflow to test changes on main branch
