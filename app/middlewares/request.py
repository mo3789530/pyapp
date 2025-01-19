
from typing import Any, Callable, Coroutine

from fastapi import Request, Response
from fastapi.routing import APIRoute
from logging import getLogger

logger = getLogger(f"uvicorn.{__name__}")


class LoggingAPIRoute(APIRoute):
    def get_route_handler(self) -> Callable[[Request], Coroutine[Any, Any, Response]]:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            # await self._logging_request_body(request=request)

            response = await original_route_handler(request)
            return response

        return custom_route_handler

    async def _logging_request_body(self, request: Request):
        body = await self._get_request_body(request)

        request_info = {
            "method": request.method,
            "url": str(request.url),
            "body": body,
        }

        logger.info("start request", extra={"request_info": request_info})
