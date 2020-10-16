<template>
  <ul id="tokens" class="tokens token">
    <li data-server-rendered="true">
      data-server-rendered="true"
    </li>
    <li data-test="data-test">
      data-test="token"
    </li>
    <li data-testid="data-testid">
      data-testid="token"
    </li>
    <li data-test-id="data-test-id">
      data-test-id="token"
    </li>
    <li data-qa="data-qa">
      data-qa="token"
    </li>
    <li data-cy="data-cy">
      data-cy="token"
    </li>
    <li id="test">
      id="test"
    </li>
    <li id="testId">
      id="testId"
    </li>
    <li id="test-id">
      id="test-id"
    </li>
    <li class="test">
      class="test"
    </li>
    <li class="testToken">
      class="testToken"
    </li>
    <li class="test-token">
      class="test-token"
    </li>
    <li class="test-token testToken test">
      class="test-token testToken test"
    </li>
    <li class="test active">
      class="test active"
    </li>
    <li :class="{ 'active': false }">
      class=""
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TestTokens'
};
</script>
